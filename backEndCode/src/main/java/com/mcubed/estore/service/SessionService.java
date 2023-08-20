package com.mcubed.estore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class SessionService {
	@Autowired
    private HttpSession httpSession;

    public void setLoggedInUser(String username) {
        httpSession.setAttribute("loggedInUser", username);
    }

    public String getLoggedInUser() {
        return (String) httpSession.getAttribute("loggedInUser");
    }

    public void clearSession() {
        httpSession.invalidate();
    }
}
