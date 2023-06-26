import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/socket";
import { InputComponent } from "../components/tags/input";
import ButtonComponent from "../components/tags/button";
import moment from "moment";

const ChatRoom = () => {
  const [values, setValues] = useState({ message: "", from: "" });
  const { socket } = useSocket();

  const ref = useRef();

  const [contents, setContents] = useState([]);

  useEffect(() => {
    if (ref?.current?.lastElementChild !== null) {
      ref?.current?.lastElementChild?.scrollIntoView();
    }
    socket?.on("receive-message", (message) => {
      console.log(message);
      setContents([...contents, message]);
    });
  }, [ref, contents, socket]);

  console.log(contents);

  const sendMessage = (e) => {
    e.preventDefault();
    setValues({ message: "", from: "" });
    socket.emit(
      "createMessage",
      {
        from: "tech bro",
        message: values.message,
        receivers: ["1234"],
        sender: "7890",
      },
      (text) => {
        setContents([...contents, text]); // setContents([...contents, text]);
        console.log(text);
      }
    );
  };

  const renderContents = contents?.map((data, index) => {
    return (
      <div
        key={data.createdAt}
        className={` max-w-[45%] bg-white p-2  rounded-md my-3 ${
          data?.sender === "7890" ? "self-end" : ""
        } `}
      >
        <span>time : {moment(data?.createdAt).format("LT")}</span>
        <h3> from : {data?.from}</h3>
        <h3> message : {data?.message}</h3>
      </div>
    );
  });

  if (!socket) {
    return <h1>still connection to the socket</h1>;
  }
  return (
    <main className="">
      <section className="flex overflow-y-hidden">
        <aside className="bg-orange-400   text-white p-3 w-36 px-5 h-screen">
          <h1>Active Users</h1>
        </aside>
        <form className="grow p-4 flex bg-gray-200  flex-col h-screen justify-between item-between">
          <div className="overflow-y-scroll py-4 font-mono tracking-wide">
            <h1 className="text-right text-orange-700 font-black">Dispute</h1>
            <section className="flex p-2 flex-col" ref={ref}>
              {renderContents}
            </section>
          </div>
          <div className="flex w-full p-2 bg-white items-center">
            <div className="grow mr-3">
              <InputComponent
                name="message"
                // title="Message"
                setValues={setValues}
                values={values}
              />
            </div>
            <div className="flex justify-end items-center self-end items-self-end my-3">
              {values.message && (
                <ButtonComponent
                  clickHandler={sendMessage}
                  title="Send Message"
                />
              )}
            </div>
          </div>
        </form>
      </section>
      {/* <h1 className="font-mono text-slate-700 text-center font-black text-xl tracking-widest">
        Welcome to the chat room big man
      </h1> */}
    </main>
  );
};

export default ChatRoom;
