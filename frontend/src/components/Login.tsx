import React, { useRef } from "react";
import { Button, Input, Form } from "antd";
import styles from "../css/Login.module.css";
import { LoginReqType } from "../types";
import { AuthSignupState, getSignupSuccess } from "../redux/modules/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  authSignupStart,
  authSignupSuccess,
} from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  // antd form control
  const [form] = Form.useForm();

  const authSignup: AuthSignupState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log("authSignup", authSignup);
  const navigate = useNavigate();

  // submit 할때 Form
  const onSubmitForm = () => {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    console.log("email, password", email, password);
    dispatch(getSignupSuccess({ nickname: "12", email, password }));
    navigate("/");
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_box}>
        <div className={styles.illustration_wrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form className={styles.login_form} onFinish={onSubmitForm} form={form}>
          <p
            style={{
              color: "#333333",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: 1,
              marginBottom: 0,
              //   marginLeft: 10,
            }}
          >
            Login Book
          </p>
          {/* <p style={{ marginBottom: 30 }}>Login to the Dashboard</p> */}
          <div className={styles.email_title}>
            Email <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>
          </Form.Item>
          <div className={styles.password_title}>
            Password <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <div className={styles.input_area}>
              <Input.Password
                type="password"
                autoComplete="current-password"
                name="password"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
          </Form.Item>
          <div className={styles.button_area}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              size="large"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;