const NewsLetter = () => {
    return (
        <div className="newsletter">

            <h2 className="h2">Newsletter</h2>

            <div className="wrapper">

                <p>
                    Subscribe to our newsletter to be among the first to keep up with the latest updates.
                </p>

                <form action="#">
                    <input type="email" name="email" placeholder="Email Address" required />

                    <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>

            </div>

        </div>
    )
}

export default NewsLetter