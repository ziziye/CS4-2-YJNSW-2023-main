function PDF(props) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "#00000066",
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
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>PDF</div>
        <iframe src={props.url} style={{ flex: 1, width: "100%" }}></iframe>
        {/* <a href={props.url} target="_blank" rel="noopener noreferrer">
          点击这里在新页面中查看PDF
        </a> */}
        {/* <embed src={props.url} type="application/pdf" style={{ flex: 1, width: "100%" }}></embed> */}
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

export default PDF;
