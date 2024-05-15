"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function DisplayCount() {

    const [getCount,setCount] = useState<string>();

  function socketClient() {
    const socket = io(`http://172.16.120.62:3001`, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("client-new", (data) => {
        console.log("Recieved from API ::", data);
        setCount(data as string);
      });
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
      await fetch("/api/socket/");
    });

    return socket;
  }

  useEffect(() => {
    socketClient();
  }, []);

  return <>{getCount}</>;
}
