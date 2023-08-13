package com.mcubed.estore.exceptions;

public class EmailTakenException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmailTakenException(String message) {
        super(message);
    }
}