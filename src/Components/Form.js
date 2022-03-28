import React, { useState } from "react";

import { useForm } from "react-hook-form";
import "./Form.scss";
import usePasstoggle from "./usePasstoggle";

function ValidForm() {
  const [dobmon, setdobmon] = useState("");
  const [InputType,TogText] = usePasstoggle();

  const selectHandler = (e) => {
    setdobmon(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  async function onsubmit(data) {
    const newdata = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      encryptpassword: data.encryptpassword,
      mobile: data.mobile,
      dob: data.day + "-" + dobmon + "-" + data.year,
    };

    console.log(newdata);

    fetch("https://atologistinfotech.com/api/register.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    reset();
  }
  return (
    <div className="back">
      <form action="#" onSubmit={handleSubmit(onsubmit)}>
        <div className="title">
          <h1>Sign up</h1>
          <h3>Use your current email address</h3>
        </div>
        <div className="form-input">
          <div className="combo_input">
            <div className="fname_input">
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="Firstname"
                {...register("firstname", {
                  required: "this fild is required",
                })}
              />
              {errors.firstname && (
                <div className="error">Name is required.</div>
              )}
            </div>
            <div className="sname_input">
              <input
                type="text"
                name="sname"
                id="sname"
                placeholder="Surname"
                {...register("lastname", {
                  required: "this fild is required",
                })}
              />
              {errors.lastname && (
                <div className="error">surname is required.</div>
              )}
            </div>
          </div>
        </div>
        <div className="form-input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your current email address"
            {...register("email", {
              required: "email fild is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "enter valid Email",
              },
            })}
            onKeyUp={() => trigger("email")}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>
        <div className="form-input pass">
          <input
            type={InputType}
            name="pass"
            id="pass"
            placeholder="Password"
            {...register("encryptpassword", {
              required: "this fild is required",
              minLength: {
                value: 8,
                message: "Password Length Must Greter then 8",
              },
            })}
          />
          {errors.encryptpassword && (
            <div className="error">{errors.encryptpassword.message}</div>
          )}
          {TogText}
        </div>
        <div className="form-input tel">
          <div className="code_select">
            <select name="mo" id="mo">
              <option value="ind + 91">+91</option>
            </select>
          </div>
          <div className="phno_input">
            <input
              type="text"
              placeholder="Mobile no."
              {...register("mobile", {
                required: "this fild is required",
                pattern: {
                  value: /[0-9]/,
                  message: "Must provide valid Number",
                },
                minLength:{
                  value: 10,
                  message: "Mobile number Length must 10 digit.",
                }
              })}
            />
            {errors.mobile && (
              <div className="error">{errors.mobile.message}</div>
            )}
          </div>
        </div>
        <div className="form-input">
          <div className="date-input">
             <select onChange={selectHandler}>
              <option value="0">Birth month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            {errors.month && <div className="error">this is required.</div>}
            <input
              type="text"
              name="day"
              id="day"
              placeholder="Day"
              maxLength="2"
              {...register("day", {
                required: "this fild is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "birth-date is not proper formate",
                },
              })}
            />
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Year"
              maxLength="4"
              {...register("year", {
                required: "this fild is required",
              
                minLength: {
                  value: 4,
                  message: "birth-date is not proper formate",
                },  pattern:{
                  value: /^[0-9]+$/,
                  message:"enter proper date"
                },
              })}
            />
          </div>
          {errors.day && errors.year && (
            <div className="error">{errors.year.message}</div>
          )}
        </div>
        <div className="form-input">
          <input name="gender" id="gender" placeholder="Gender(optional)" />
        </div>
        <footer>
          <p className="TMC">
            By clicking "Continue", you agree to the <a href="#">Terms</a> and{" "}
            <a href=""> Privacy Policy</a>
          </p>
          <button className="btn btncon" type="submit">
            Continue
          </button>
          <p className="ARA">
            Already have an account?<a href="#"> Sign in</a>
          </p>
        </footer>
      </form>
    </div>
  );
}

export default ValidForm;
