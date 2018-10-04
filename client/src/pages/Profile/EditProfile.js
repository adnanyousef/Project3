/* global $ */
import React from "react";
import UserAPI from "../../utils/userAPI";
import { Col, Row, Container } from "../../components/Grid";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

class EditProfile extends React.Component {
  state = {
    id: "",
    pic: "",
    linkedin: "",
    portfolio: "",
    languages: [],
    technologies: [],
    jobTitle: "",
    jobCompany: "",
    following: [],
    followInput: "",
    searchInput: ""
  };

  componentDidMount() {
    $(".collapse").collapse();

    UserAPI.getUser().then(data => {
      this.setState({
        id: data.data._id,
        pic: data.data.profile.pic,
        github: data.data.profile.github,
        linkedin: data.data.profile.linkedin,
        portfolio: data.data.profile.portfolio,
        languages: data.data.profile.languages.join(","),
        technologies: data.data.profile.technologies.join(","),
        jobTitle: data.data.profile.jobInfo
          ? data.data.profile.jobInfo.title
          : "",
        jobCompany: data.data.profile.jobInfo
          ? data.data.profile.jobInfo.company
          : "",
        following: data.data.following
      });
    });
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    UserAPI.editUser({
      "profile.pic": this.state.pic,
      "profile.github": this.state.github,
      "profile.linkedin": this.state.linkedin,
      "profile.portfolio": this.state.portfolio,
      "profile.languages": this.state.languages.split(","),
      "profile.technologies": this.state.technologies.split(",")
    })
      .then(data => {
        if (data.data.success) {
          window.location.replace("/profile");
        } else {
          console.log(data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  cancel = event => {
    event.preventDefault();
    // window.location.replace("/editProfile");
    $(".collapse").collapse("hide");
  };

  handleFollow = event => {
    event.preventDefault();
    UserAPI.followUser(this.state.followInput)
      .then(data => {
        if (data.data.success) {
          alert("Successfully followed user!");
          window.location.replace("/editProfile");
        } else {
          alert("User not found");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUnfollow = id => {
    UserAPI.unfollowUser(id)
      .then(data => {
        console.log(data.data);
        alert(data.data);
      })
      .catch(err => {
        console.log(err);
        alert("There was an error :(");
      });
  };

  handleSearch = event => {
    event.preventDefault();
    UserAPI.searchUsers(this.state.searchInput)
      .then(data => {
        if (!data.data) {
          return alert("No user found");
        }
        window.location.replace("/profile/" + data.data._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col size="md-8">
              <h4 className="editTitle">Edit Profile</h4>
              <div id="accordion">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Profile Pic
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="pic"
                          value={this.state.pic}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Github
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="github"
                          value={this.state.github}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        LinkedIn
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="linkedin"
                          value={this.state.linkedin}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingFour">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Portfolio
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="portfolio"
                          value={this.state.portfolio}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingFive">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFiv"
                      >
                        Job Title
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseFive"
                    className="collapse"
                    aria-labelledby="headingFive"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="jobTitle"
                          value={this.state.jobTitle}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingSix">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        Company
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseSix"
                    className="collapse"
                    aria-labelledby="headingSix"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label />
                        <input
                          name="jobCompany"
                          value={this.state.jobCompany}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingSeven">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseSeven"
                        aria-expanded="false"
                        aria-controls="collapseSeven"
                      >
                        Languages
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseSeven"
                    className="collapse"
                    aria-labelledby="headingSeven"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label>(separate with commas)</label>
                        <input
                          name="languages"
                          value={this.state.languages}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingEight">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseEight"
                        aria-expanded="false"
                        aria-controls="collapseEight"
                      >
                        Technologies
                      </button>
                    </h5>
                  </div>
                  <div
                    id="collapseEight"
                    className="collapse"
                    aria-labelledby="headingEight"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <form>
                        <label>(separate with commas)</label>
                        <input
                          name="technologies"
                          value={this.state.technologies}
                          onChange={this.handleInput}
                          type="text"
                        />
                        <br />
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col size="md-8">
              <div className="followers">
                <h5>You are following:</h5>

                {this.state.following.map(user => {
                  return (
                    <div key={user._id}>
                      {user.fullName}
                      <button
                        id="editUnfollow"
                        onClick={() => this.handleUnfollow(user._id)}
                      >
                        Unfollow
                      </button>
                    </div>
                  );
                })}

                <hr />

                <p>Follow by username:</p>
                <form>
                  <input
                    type="text"
                    name="followInput"
                    value={this.state.followInput}
                    onChange={this.handleInput}
                  />
                  <button onClick={this.handleFollow}>Follow</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditProfile;
