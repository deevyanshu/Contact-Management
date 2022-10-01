package com.deevyanshu.entity;

public class Authentication {
	
	private String message;
	
	public Authentication() {
		// TODO Auto-generated constructor stub
	}

	public Authentication(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Authentication [message=" + message + "]";
	}
	

}
