import { Form, Formik } from "formik";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import { IUser } from "../interface/Iuser";
import { login } from "../redux/AuthSlice";
import { AppDispatch, RootState } from "../store";
import { passwordRegex } from "../utils/Vars";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
      )
      .required("Password is required")
  });

  const initialValues = {
    email: "",
    password: ""
  };

  const handleSubmit = async (values: IUser) => {
    const response = await dispatch(login(values));
    if (login.fulfilled.match(response)) {
      navigate("/dashboard");
    }
  };

  return (
    <section className="flex flex-col items-center h-full py-8 bg-mainBg ">
      <header>
        <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] text-center text-secondaryBtnBg font-semibold flex items-center gap-x-2">
          Welcome to Our Hotel <BsEmojiHeartEyes />{" "}
        </h1>
        <p className="text-[1.3rem] sm:text-[1.8rem] md:text-[2.4rem] text-center text-bodyText font-semibold">
          You Have to Signin Please!
        </p>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="w-[18rem] sm:min-w-[28rem] md:min-w-[32rem] lg:min-w-[36rem] mt-10 gap-y-4  items-center flex flex-col">
            <Input name="email" type="email" label="Email" />
            <Input name="password" type="password" label="Password" />

            <div className="flex flex-col items-center justify-between w-full sm:flex-row gap-y-2">
              <Button className="w-full sm:w-[30%]" disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
              </Button>
              <p className="text-headingText ">
                Do you have an account ?{" "}
                <Link to={"/signup"} className="underline text-primaryBlue ">
                  Signup now
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      ;
    </section>
  );
};

export default Login;
