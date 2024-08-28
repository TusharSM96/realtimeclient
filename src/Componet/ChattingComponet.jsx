import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserDataContext } from "../Middlewer/AuthWrapper";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import GlobalNotify from "./GlobalNotify";
import { SocketClientContext } from "../SocketContext/SocketContext";
import { ConvertionDataGetApi, GetuserdetailsbyidApi } from "../Servies/Apis";
import moment from "moment";
function ChattingComponet() {
  const {
    UserDataHook,
    SelectMessageConvertionId,
    setSelectMessageConvertionId,
  } = useContext(UserDataContext);
  const [UserName, setUserName] = useState("");
  const [UserProfile, setUserProfile] = useState(null);
  const [OnlineFlag, setOnlineFlag] = useState(null);
  const [UserSocketId, setUserSocketId] = useState("");
  const [MassageInput, setMassageInput] = useState("");
  const [AllMessagesList, setAllMessagesList] = useState([]);
  const { SocketClient } = useContext(SocketClientContext);
  const currentMessageRef = useRef(null);
  ////Get Convertion Data All messages
  const GetConvertionMessages = () => {
    ConvertionDataGetApi({
      senderuserid: UserDataHook.userData._id,
      reciveruserid: SelectMessageConvertionId,
    }).then((resp) => {
      if (resp.code == 200 && resp.data?.length) {
        setAllMessagesList(resp.data[0]?.MessageListIds);
      } else {
        setAllMessagesList([]);
      }
    });
  };
  const MassageSendHandler = () => {
    if (MassageInput?.trim() == "") {
      GlobalNotify("Please Write Message", "i");
    } else {
      SocketClient.emit("usernewmessage", {
        message: MassageInput?.trim(),
        imagedata: {},
        senderuserid: UserDataHook.userData._id,
        sendersocid: UserDataHook?.userData.socketId,
        reciveruserid: SelectMessageConvertionId,
        reciversocid: UserSocketId,
      });

      setAllMessagesList((prev) => {
        let DataCopy = [
          ...prev,
          {
            _id: "",
            message: MassageInput?.trim(),
            senderuserid: UserDataHook.userData._id,
            reciveruserid: SelectMessageConvertionId,
            seenflag: "Y",
            sendTime: moment().format("DD-MM-YYYY HH:mm:ss"),
          },
        ];
        return [...DataCopy];
      });
      setMassageInput("");
    }
  };
  useMemo(() => {
    if (SelectMessageConvertionId != null) {
      GetuserdetailsbyidApi({ userid: SelectMessageConvertionId }).then(
        (resp) => {
          if (resp.code == 200) {
            setUserName(resp.data.username);
            setUserProfile(
              resp.data?.profilePhoto?.trim() == ""
                ? null
                : JSON.parse(resp.data?.profilePhoto)
            );
            setOnlineFlag(resp.data?.socketId);
            setUserSocketId(resp.data?.socketId);
          }
        }
      );
    }
  }, [SelectMessageConvertionId]);
  useEffect(() => {
    if (SocketClient) {
      const handleMessage = (data) => {
        setAllMessagesList((prev) => {
          const datacopy = [...prev, data];
          return datacopy;
        });
      };
      // Set up the listener
      SocketClient.on("replaymessage", handleMessage);
      // Clean up the listener
      return () => {
        SocketClient.off("replaymessage", handleMessage);
      };
    }
  }, [SocketClient]);

  useEffect(() => {
    if (SelectMessageConvertionId && UserDataHook.userData._id) {
      GetConvertionMessages();
    }
  }, [SelectMessageConvertionId, UserDataHook.userData._id]);

  useEffect(() => {
    if (currentMessageRef?.current) {
      currentMessageRef.current.scrollTop =
        currentMessageRef.current.scrollHeight;
    }
  }, [AllMessagesList]);
  return (
    <div
      className={`messagingmain ${
        SelectMessageConvertionId == null ? "d-nonemy" : ""
      }`}
    >
      <div className="chatuserdetails">
        <div className="chatuserleft">
          <FaArrowLeft
            title="Back"
            className="cursor"
            size={30}
            onClick={() => {
              setSelectMessageConvertionId(null);
            }}
          />
          &nbsp; &nbsp; &nbsp;
          {UserProfile?.Base64 ? (
            <img
              width={50}
              height={50}
              alt="Profile"
              src={`data:${UserProfile?.type};base64,${UserProfile?.Base64} `}
              style={{ borderRadius: "25px" }}
            />
          ) : (
            <FaRegCircleUser size={50} />
          )}
          &nbsp; &nbsp; &nbsp;
          <div className="d-flex flex-column">
            <b>{UserName}</b>
            <span
              style={{
                color: `${OnlineFlag ? "#0fff0f" : "red"}  `,
                fontWeight: 600,
              }}
            >
              {OnlineFlag ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <div className="chat_massages" ref={currentMessageRef}>
        {AllMessagesList?.map((messgaeval, index) => (
          // message_right message_left
          <div
            className={`message_main ${
              messgaeval.senderuserid === UserDataHook.userData._id
                ? "message_right"
                : "message_left"
            }`}
            key={index}
          >
            <b>{messgaeval.message}</b>
            <small style={{ alignSelf: "flex-end" }}>
              {/* {JSON.stringify(messgaeval)} */}
              {messgaeval.sendTime
                ? moment(messgaeval.sendTime, "DD-MMM-YYYY HH:mm:ss").format(
                    "HH:mm"
                  )
                : ""}
            </small>
          </div>
        ))}
      </div>
      <div className="massging_menu">
        &nbsp;
        <IoMdAdd size={30} />
        &nbsp; &nbsp;
        <input
          placeholder="Write Your Message"
          type="text"
          className="form-control"
          value={MassageInput}
          onChange={(e) => setMassageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              MassageSendHandler();
            }
          }}
        />
        &nbsp; &nbsp;
        <button className="btn btn-outline-danger" onClick={MassageSendHandler}>
          Send
        </button>
        &nbsp; &nbsp;
      </div>
    </div>
  );
}
export default memo(ChattingComponet);
