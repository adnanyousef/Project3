import React, { Component } from "react";
import Card from "../Card/Card"
import "./UserInfo.css";

//function to iterate through languages array and create li
//function to iterate through technologies and create li


class UserInfo extends Component {
    
    generateLanguages = () => {
         const arr = this.props.languages.map(language => {
            return(
               <li key={this.props.id+language}>{language}</li>
            ) 
        });
        return arr;
    }

    generateTechnologies = () => {
        const arr = this.props.technologies.map(tech => {
            return(
               <li key={this.props.id+tech}>{tech}</li>
            )
        });
        return arr;
    }


    render() {
       
        return(
            
            <div className="info-content">
                <Card className="info-card">
                    <h5>{this.props.title}</h5>
                    <p>{this.props.company}</p>
                    <div className="profile-links">
                        <a href={this.props.github} target="_blank">GitHub</a> | 
                        <a href={this.props.portfolio} target="_blank"> Portfolio</a> |
                        <a href={this.props.linkedin} target="_blank"> LinkedIn</a>
                    </div>
                    <div className="profile-projects">
                        <h6>Projects</h6>
                    </div>
                </Card>
                <Card className="skills-card">
                    <div>
                        <div className="col-xs-6">
                          <ul className="languages">
                            <h6>Language(s):</h6>
                            { this.generateLanguages() }
                            {/* <li>JavaScript</li>
                            <li>Python</li>
                            <li>PHP</li> */}
                          </ul>
                        </div>
                        <div className="col-xs-6">
                          <ul className="technologies">
                            <h6>Technologies:</h6>
                            { this.generateTechnologies() }
                            {/* <li>HTML/CSS</li>
                            <li>React</li>
                            <li>MongoDB</li> */}
                          </ul>
                        </div>
                    </div>
                </Card>
          </div>
        )
    }

}

export default UserInfo;