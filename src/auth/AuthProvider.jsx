import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  // GoogleAuthProvider,
  // signInWithPopup,
  // sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useToast } from "@chakra-ui/react";

const setToast = {
  duration: 5000,
  isClosable: true,
  containerStyle: {
    marginBottom: "50px",
  },
};

export let AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const signup = async ({ email, password, firstName, lastName }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //________Actualizar name en auth firebase_________
      updateProfile(userCredentials.user, {
        displayName: `${firstName} ${lastName}`,
      });

      //________Email verification_________

      const config = {
        url: "http://localhost:3000/",
      };
      sendEmailVerification(userCredentials.user, config)
        .then((res) => {
          toast({
            title: "Account Created.",
            description: "Verify your account. Check your email.",
            status: "success",
            ...setToast,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "error al enviar email de verificacion",
            description: error.message,
            status: "error",
            ...setToast,
          });
        });

      //===========USER DB===========

      try {
        const docRef = doc(db, "users", userCredentials.user.uid);
        await setDoc(docRef, {
          firstName,
          lastName,
          email,
          fullName: `${firstName} ${lastName}`,
          uid: userCredentials.user.uid,
          role: "customer",
          photoURL: userCredentials.user.photoURL,

        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Sign In Error.",
        description: error.message,
        status: "error",
        ...setToast,
      });
    }
    // signOut(auth);
  };

  const getCredentials = () => {
    return auth.AuthCredential;
  };

  const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      currentUser &&
        console.log({
          email: currentUser.email,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
          isVerified: currentUser.emailVerified,
        });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  let value = { user, signup, login, logout, loading, getCredentials };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
 const signup =  ({ email, password, firstName, lastName }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        updateProfile(userCredentials.user, {
          displayName: `${firstName} ${lastName}`,
        });

        //_________________
        const config = {
          url: "http://localhost:3000/",
        };

        sendEmailVerification(userCredentials.user, config)
          .then((res) => {
            toast({
              title: "Account Created.",
              description: "Verify your account. Check your email.",
              status: "success",
              ...setToast,
            });
          })
          .catch((error) => {
            console.log(error);
            toast({
              description: error.message,
              status: "error",
              ...setToast,
            });
          });

          //======================
    
          const docRef = doc(db ,"users", userCredentials.user.uid);
          setDoc(docRef, {
              firstName,
              lastName,
              email,
              uid: userCredentials.user.uid,
              role: "customer",
          })
         
        // }).catch((e) => console.log(e));
        // const docRef = doc(db, "users", userCredentials.user.uid);
        // console.log("uid", userCredentials.user.uid);
        //   .then((res) => {
        //     console.log(res);
        //   })

        signOut(auth);
      })
      // .catch((error) => {
      //   console.log("e", error);
      //   toast({
      //     // title: 'Login Error.',
      //     description: error.message,
      //     status: "error",
      //     ...setToast,
      //   });
      // });
  };
*/
