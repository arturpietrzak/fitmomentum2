import React, { useState, useEffect, createContext } from "react";

export default function useAccount() {
  function logout() {
    localStorage.removeItem("username");
  }

  function login(username: string) {
    localStorage.setItem("username", username);
  }

  function getUser() {
    return localStorage.getItem("username");
  }

  return { getUser, logout, login };
}
