const Topics = () => {
    return (
        <div className="topics">

            <h2 className="h2">Topics</h2>

            <a href="/" className="topic-btn">
                <div className="icon-box">
                    <ion-icon name="server-outline"></ion-icon>
                </div>

                <p>Database</p>
            </a>

            <a href="/" className="topic-btn">
                <div className="icon-box">
                    <ion-icon name="accessibility-outline"></ion-icon>
                </div>

                <p>Accessibility</p>
            </a>

            <a href="/" className="topic-btn">
                <div className="icon-box">
                    <ion-icon name="rocket-outline"></ion-icon>
                </div>

                <p>Web Performance</p>
            </a>

        </div>
    )
}

export default Topics