import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const InterviewMate = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data?.session) setSessionData(response.data.session);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Generate concept explanation
  const generateConceptExplanatin = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);

      setOpenLearnMoreDrawer(true);

      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) setExplanation(response.data);
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanations! Try again later");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle pin status
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) fetchSessionDetailsById();
    } catch {}
  };

  // Load more questions
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generated = aiResponse.data;

      await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generated,
      });

      setSessionData((prev) => ({
        ...prev,
        questions: [...prev.questions, ...generated],
      }));
    } catch {
      setErrorMsg("Something went wrong. Please try again!");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, []);

  return (
    <DashboardLayout>
      {/* HEADER */}
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        {/* PAGE TITLE */}
        <h2 className="text-lg font-semibold text-gray-900">
          Your Personalized Interview Preparation Kit is here! 🔥
        </h2>

        <div className="grid grid-cols-12 gap-6 mt-5">
          {/* LEFT SIDE */}
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-12"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                  }}
                  layout="position"
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() => generateConceptExplanatin(data.question)}
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                  />

                  {/* LOAD MORE BUTTON */}
                  {!isLoading &&
                    sessionData?.questions?.length === index + 1 && (
                      <div className="flex items-center justify-center mt-5">
                        <button
                          className="flex items-center gap-3 text-sm text-white font-medium 
                          bg-red-500 px-6 py-2 rounded-full shadow-md 
                          hover:bg-red-600 transition"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? (
                            <SpinnerLoader />
                          ) : (
                            <LuListCollapse className="text-lg" />
                          )}
                          Load More
                        </button>
                      </div>
                    )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE — EXPLANATION PANEL */}
          {openLearnMoreDrawer && (
            <div className="col-span-12 md:col-span-5">
              <div className="bg-white border border-red-100 rounded-xl shadow-lg px-5 py-4 h-full">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-red-600">
                    {!isLoading && explanation?.title}
                  </h3>

                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setOpenLearnMoreDrawer(false)}
                  >
                    ✕
                  </button>
                </div>

                {errorMsg && (
                  <p className="flex gap-2 text-sm text-red-500 font-medium">
                    <LuCircleAlert className="mt-1" /> {errorMsg}
                  </p>
                )}

                {isLoading && <SkeletonLoader />}

                {!isLoading && explanation && (
                  <AIResponsePreview content={explanation?.explanation} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewMate;
