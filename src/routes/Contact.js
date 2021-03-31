import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Route, Switch} from "react-router-dom";
import {fetchContactForm} from "./_fetchAPI";

export default function Contact() {
  // https://script.google.com/macros/s/AKfycbxSGR3c2JgMWS-ykBKXGtBnTVKLH3H_ER7qdB7H8A/exec

  const [form, setForm] = useState("Type stuff");
  const [name, setName] = useState("Your Name");

  return (
    <div className='Page'>
      <article className='Contact'>
        <div className='email'>
          <div>
            petar.guglev at gmail 
          </div>
          <div>
            This form doesn't work lol.
          </div>
        </div>
        <div className='UpperDiv'>
          <input type="text"
            value={name}
            onChange={e=>{
              setName(e.target.value)
            }}
          />
          <div
            className='SubmitButton'
            onClick={() => {
              fetchContactForm(form);
            }}>
            <div className='ButtonText'>Send</div>
          </div>
        </div>
        <textarea
          type='text'
          value={form}
          onChange={e => {
            setForm(e.target.value);
          }}
        />
      </article>
    </div>
  );
}
