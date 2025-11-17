import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // stable hash function
  const hash = (str = "") =>
    str.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully!");

      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session.");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-8 px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Your Sessions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              All your interview prep — neatly organized for you.
            </p>
          </div>

          {/* Add Session Button */}
          <button
            onClick={() => setOpenCreateModal(true)}
            className="
              inline-flex items-center gap-2
              bg-linear-to-r from-red-400 to-red-500
              text-white px-5 py-2.5 rounded-full
              shadow-lg hover:shadow-red-300/40
              hover:scale-[1.03]
              transition-all
            "
          >
            <LuPlus className="text-lg" />
            <span className="text-sm font-medium">Add Session</span>
          </button>
        </div>

        {/* EMPTY STATE */}
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center select-none">
            <div className="w-[150px] h-[150px] flex items-center justify-center rounded-2xl bg-red-50 shadow-inner mb-6">
              <div className="text-6xl">😕</div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Sessions Yet
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              You haven’t created any interview sessions yet. Start by creating
              your first one!
            </p>
          </div>
        )}

        {/* SESSIONS GRID */}
        {sessions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((data) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[Math.abs(hash(data._id)) % CARD_BG.length]}
                role={data?.role}
                topicsToFocus={data?.topicsToFocus}
                experience={data?.experience}
                questions={data?.questions?.length}
                description={data?.description}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YY")
                    : ""
                }
                onSelect={() => navigate(`/interview-mate/${data?._id}`)}
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL — Create */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* MODAL — Delete */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() =>
          setOpenDeleteAlert({
            open: false,
            data: null,
          })
        }
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
