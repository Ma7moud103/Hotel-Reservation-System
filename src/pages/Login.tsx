import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Input from "../components/Input";
import { login } from "../redux/AuthSlice";
import { AppDispatch, RootState } from "../store";
import { BsEmojiHeartEyes } from "react-icons/bs";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { passwordRegex } from "../utils/Vars";
import { IUser } from "../interface/Iuser";
import AuthLayout from "../layouts/AuthLayout";
import { useEffect } from "react";

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
    <AuthLayout>
      <section className="h-full py-8 bg-mainBg flex flex-col items-center ">
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

              <div className="w-full flex flex-col sm:flex-row gap-y-2 items-center justify-between">
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
    </AuthLayout>
  );
};

export default Login;
