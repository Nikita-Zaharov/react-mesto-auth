import { useEffect, useState } from "react";
import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoToolTip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import { auth } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);

  const history = useHistory();

  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
          }
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          history.push("/sign-in");
          console.log(`Ошибка ${err}`);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  });

  const onRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoToolTipPopupOpen(true);
          history.push("/sign-in");
          console.log("register");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  const onLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
          console.log("login");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  };

  useEffect(() => {
    console.log(loggedIn);
    if (loggedIn)
      api
        .getInitialsCard()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  useEffect(() => {
    console.log(loggedIn);
    if (loggedIn)
      api
        .getInfoUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });

    console.log(card._id);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(items) {
    api
      .editProfile(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(items) {
    api
      .editAvatar(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(items) {
    api
      .addCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipPopupOpen();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={email} loggedIn={loggedIn} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              onSignOut={onSignOut}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleLikeClick}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {loggedIn ? (
                <Redirect to="/users/me" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
