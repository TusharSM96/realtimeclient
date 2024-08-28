import React, { useContext, useEffect, useState } from "react";
import Conversioncard from "./Conversioncard";
import { UserDataContext } from "../Middlewer/AuthWrapper";
import MassageImag from "../assets/messaging.jpg";
import { RiMessage2Line } from "react-icons/ri";
import ChattingComponet from "./ChattingComponet";
import { SocketClientContext } from "../SocketContext/SocketContext";
import { ConvertiongetallsenderApi } from "../Servies/Apis";
import moment from "moment";
export default function ChatMainWindow() {
  const [ConvertionList, setConvertionList] = useState([]);
  const {UserDataHook, SelectMessageConvertionId, setSelectMessageConvertionId } =
    useContext(UserDataContext);
  const { SocketClient } = useContext(SocketClientContext);
  const AddConvertionChatId = (conid) => {
    setSelectMessageConvertionId(conid)
  };

  const GetAllConvartionData=()=>{
    ConvertiongetallsenderApi({convertionuserId:UserDataHook.userData?._id}).then((resp)=>{
      if(resp.code==200 && resp?.data?.length){
        setConvertionList(resp?.data)
      }
    })
  }
  useEffect(() => {
    if (SocketClient) {
      SocketClient.on("newconvertion", (data) => {
        GetAllConvartionData()
      });
    }
  }, [SocketClient]);




  useEffect(()=>{
    if(UserDataHook.userData?._id){
      GetAllConvartionData()
    }
  },[UserDataHook.userData?._id])
  return (
    <div className="chatMenuMain">
      <div
        className={`sideuserlist ${
          SelectMessageConvertionId == null ? "" : "d-nonemy"
        }`}
      >
        <h1 className="HeadingSidebar">MESSAGES</h1>
        <div className="convertionlistmain">
          {ConvertionList?.length ? (
            ConvertionList?.map((value, index) => (
              <Conversioncard
                onClick={(e) => AddConvertionChatId(value?.reciverUserId.reciverId)}
                username={value.reciverUserId?.username}
                time={moment(value?.LastMesssageDate,"DD-MMM-YYYY HH:mm:ss").format('HH:mm')}
                Message={value.LastMessage?.message}
                key={index}
              />
            ))
          ) : (
            <div className="NoConvertionDataMain d-flex flex-column align-items-center p-5">
              <RiMessage2Line size={100} />
              <h3>Explore Users to Start a Conversation with .</h3>
            </div>
          )}
        </div>
      </div>
      {SelectMessageConvertionId == null && (
        <div className={`messagingmain d-nonemy p-5`}>
          <img className="messagingmainimg" src={MassageImag} alt="image" />
          <h1>Welcome to Chat App</h1>
          <h3>Lets Connect with Your Customer in Real Time</h3>
          <h5>
            Makes Your Communication with Realatives ,Work Friends,Family Membar
            and More . Stay Connected with Them{" "}
          </h5>
        </div>
      )}

      {SelectMessageConvertionId != null && <ChattingComponet />}
    </div>
  );
}
