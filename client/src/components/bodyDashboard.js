import React, {Component} from 'react';

class BodyDashboard extends Component {
    render() {
        return (
            <div className="container dashboard">
                <div class="row">

                    <div class="col-8">

                        <div class="card left">
                            <div className="row">
                            <div class="card-body-div col-md-8">
                                <h4 class="white-text">Claim 300 bids for Free</h4>
                                <h5 className="white-text">Get started with a FREE TRAIL for 300 bids and more!</h5>
                            </div>
                            <div className="image-card col-md-4">
                                <img
                                    src="https://cdn5.f-cdn.com/build/img/membership-bids-upsell-banner/membership-badge2.png"
                                    alt="Membership Badge" role="presentation"/>
                            </div>
                            </div>
                        </div>

                        <div class="card card-left-next">
                            <div class="card-body">
                                <span className="font-weight-bold">Newsfeed</span>
                                <hr/>
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 profile-section">
                        <div class="card">
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <img
                                            src="https://www.buira.org/assets/images/shared/default-profile.png"
                                            alt="..." className="rounded  d-block dashboard-profilepic"
                                        />
                                    </div>
                                    <div className="col-8 name-section">
                                        <span className="small-font"><strong>Welcome back,</strong></span>
                                        <h5>Vishal V.</h5>
                                        <span>
                                            <a href="#" className="small-font">Free Member</a>
                                        </span><br/>
                                        <a href="#" class="butt btn btn-success"><strong>Upgrade now</strong></a>
                                    </div>
                                </div>


                                <p class="card-text"><strong>Set up your account</strong></p>
                                <p></p>
                                <p></p>
                            </div>
                        </div>

                        <div class="card card-right-next">
                            <h5 class="card-header">Featured</h5>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                        <div class="card card-right-next">
                            <h5 class="card-header">Featured</h5>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                        <div class="card card-right-next">
                            <h5 class="card-header">Featured</h5>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default BodyDashboard;