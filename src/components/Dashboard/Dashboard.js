import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllLevels,
  getAllUserLevelsByOktaUID,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

const Dashboard = (props) => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  function logout() {
    localStorage.removeItem("okta-token-storage");
    history.push("/");
    window.location.pathname = '/';
  }

  useEffect(() => {
    // authService.getUser().then(info => {
    //   console.log(info)
    // });
    console.log(JSON.parse(localStorage.getItem("okta-token-storage")))
    axios
      .post("http://localhost:5000/user/signup", JSON.parse(localStorage.getItem("okta-token-storage")))
      .then((res) => {
        console.log(res);
        props.getAllUserLevelsByOktaUID(res.data.okta_uid);
        props.getAllLevels();
      })
      .catch((err) => {
        console.log("error loggin in and or registering", err);
      });

    if (props.levels.length > props.userLevels.length) {
      // props.addLevelsToUserAccount(props.levels, props.userLevels);
    } else if (props.levels.length < props.userLevels.length) {
      throw new Error("This should be unreachable");
    }
  }, []); //props.levels.length

  return (
    <div className="dashboard-wrapper">
      <span className="logout-span">
        <p className="logout-filler"></p>
        <p className="logout" onClick={logout}>
          Log Out
        </p>
      </span>
      {props.isLoading ? (
        <>
          <p>{props.loadingMessage}</p>
        </>
      ) : (
        props.userLevels.map((levelData) => (
          <DashboardCard
            key={levelData.id}
            levelData={levelData}
            title={levelData.level_id}
          />
        ))
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.authReducer.isLoading,
    loadingMessage: state.authReducer.loadingMessage,
    levels: state.levelsReducer.levels, // array of all levels in database
    userLevels: state.levelsReducer.userLevels, // array of userLevels by userID in database
  };
}

const mapDispatchToProps = {
  getAllLevels,
  getAllUserLevelsByOktaUID,
  addLevelsToUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
