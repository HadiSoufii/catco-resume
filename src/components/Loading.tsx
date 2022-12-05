import loading from "./../assets/images/loading1.gif";

const Loading = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "hidden"
        }}>
            <img src={loading} alt="loading" />
        </div>
    );
};

export default Loading;