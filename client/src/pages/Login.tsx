import { CSSProperties, useState } from "react";
import SignUpForm from "../components/AuthPage/SignUpForm";
import LogInForm from "../components/AuthPage/LogInForm";

const AuthPage = () => {
  const [hasAccount, setHasAccount] = useState(false);

  const backgroundImage = {
    backgroundColor: `#f7f7f7`, // Here due to variable
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>
      <div className="background-gradient-dark">
        <div style={styles.formContainerStyle}>
          <div style={styles.titleStyle}>Pretty</div>

          {hasAccount ? (
            <LogInForm onHasNoAccount={() => setHasAccount(false)} />
          ) : (
            <SignUpForm onHasAccount={() => setHasAccount(true)} />
          )}
        </div>
        
      </div>
    </div>
  );
};

const styles = {
  formContainerStyle: {
    width: "100%",
    maxWidth: "650px",
    padding: "36px 72px",
    backgroundColor : "white"
  } as CSSProperties,
  titleStyle: {
    fontSize: "24px",
    fontFamily: "VisbyRoundCF-Heavy",
    letterSpacing: "0.5px",
    color: "white",
    paddingBottom: "11vw",
  } as CSSProperties,
};

export default AuthPage;