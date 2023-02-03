import axios from "axios";
import { gapi } from "gapi-script";
import googleClientApi from "google-client-api";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import ListPdfBtn from "./drivepdf";



const GoogleSignIn = () => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [drivePdf, setDrivePdf] = useState([]);

    const SignInHandler = async (e) => {
        try {

            const { data } = await axios.get("http://localhost:8000/login_authorization_url", {


            })
            console.log(data)
            const url = data["url"];
            const newWindow = window.open(url, "_blank", "width=600,height=600");
            const timer = setInterval(async () => {
                if (newWindow.closed) {
                    clearInterval(timer);
                    setIsLoggedIn(true);

                }
            }, 500);



        } catch (error) {
            console.log(error);
        }
    };

    const GetProfile = async (e) => {
        try {

            const { data } = await axios.get("http://localhost:8000/google_profile", {


            })
            console.log(data)
            const user_data = data["data"];
            setUserProfile(user_data);

        } catch (error) {
            console.log(error);
        }
    };


    const AuthGDrive = async (e) => {
        try {

            const { data } = await axios.get("http://localhost:8000/drive_access_authorization_url", {
            })
            console.log(data)
            const url = data["url"];
            const newWindow = window.open(url, "_blank", "width=600,height=600");
            const timer = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(timer);
                    // alert('"Secure Payment" window closed!');
                }
            }, 500);


        } catch (error) {
            console.log(error);

        }
    };

    const LoadPdfHandler = async (e) => {
        try {

            const { data } = await axios.get("http://localhost:8000/list_pdfs", {


            })
            console.log(data)
            const files = data["data"];
            setDrivePdf(files);

        } catch (error) {
            console.log(error);
        }
    };

    const signOut = () => {
        setIsLoggedIn(false);
        setUserProfile(null);
        setDrivePdf([])
    };



    return (
        <div>
            {!isLoggedIn && (
                <button onClick={SignInHandler} >Sign In</button>
            )}

            {isLoggedIn ? <button onClick={GetProfile} >GetProfile</button> : null}

            {isLoggedIn  && userProfile &&(

                <div>
                    <p>Welcome, {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    <img src="https://lh3.googleusercontent.com/a/AEdFTp6gyzqTI5OR1jZBBAwl3rirEGf3CFTlwiPSS2aFJw=s96-c" alt="Profile Pic" />
                    <button onClick={signOut}>Sign Out</button>
                    <button onClick={AuthGDrive} >Authorize GDrive Readonly</button>
                    <button onClick={LoadPdfHandler} >Load Pdf</button>
                    <ul>
                        {drivePdf.map((pdf) => (<li key={pdf.id}><b>id =</b> { pdf.id}<br/> <b>name =</b> {pdf.name} </li>) )}
                        {/* {drivePdf} */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GoogleSignIn;
