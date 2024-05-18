function Video(props) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000066",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "15vw",
          top: "15vh",
          width: "70vw",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 20,
          overflow: "hidden",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>Video</div>
        <video
          src={props.url}
          controls
          style={{ height: "calc(100% - 100px)", width: "100%", objectFit: "contain" }}
        ></video>
        <button
          style={{
            width: 200,
            height: 40,
            backgroundColor: "#7872ff",
            color: "#fff",
            borderRadius: 5,
            border: "none",
            marginTop: 20,
            cursor: "pointer",
          }}
          onClick={() => {
            props.close();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Video;
