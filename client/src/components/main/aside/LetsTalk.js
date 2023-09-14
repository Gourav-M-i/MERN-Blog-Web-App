import { useLoaderData } from "react-router-dom"

const LetsTalk = () => {
    const user = useLoaderData();
    // console.log("let's talk", user)
    // const facebook = user.facebook
    // const instagram = user.instagram
    // const linkedin = user.linkedin
    return (
        <div className="contact">

            <h2 className="h2">Let's Talk</h2>

            <div className="wrapper">

                <p>
                    Do you want to learn more about how I can help your company overcome problems? Let us have a
                    conversation.
                </p>

                <ul className="social-link">

                    {user && user.facebook && <li>
                        <a href={user.facebook} className="icon-box discord">
                            <ion-icon name="logo-discord">F</ion-icon>
                        </a>
                    </li>}

                    {user && user.instagram && <li>
                        <a href={user.instagram} className="icon-box twitter">
                            <ion-icon name="logo-twitter">I</ion-icon>
                        </a>
                    </li>}

                    {user && user.linkedin && <li>
                        <a href={user.linkedin} className="icon-box facebook">
                            <ion-icon name="logo-facebook">L</ion-icon>
                        </a>
                    </li>}

                </ul>

            </div>

        </div >
    )
}

export default LetsTalk