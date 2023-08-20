package com.mcubed.estore.exceptions;

public class UsernameTakenException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UsernameTakenException(String message) {
        super(message);
    }
}