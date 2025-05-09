import axios, { AxiosResponse } from "axios";

const API_getBaseUrl = "http://localhost:3000/api/auth"; // Backend base URL

// Type for the user data, adjust based on your actual user data structure
interface UserData {
    email: string;
    password: string;
    // Add other fields as necessary
}

// Type for the OTP verification response
interface OtpResponse {
    success: boolean;
    message: string;
    // Add other fields as necessary
}

// Type for the response data of login and registration
interface AuthResponse {
    token?: string;
    message?: string;
    // Add other fields as necessary
}

// Type for the dashboard data
interface DashboardData {
    data: any;  // Define a more specific structure based on your dashboard data
}

// Register User
export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(
            `${API_getBaseUrl}/register`,
            userData,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Registration failed";
    }
};

// Resend OTP
export const resendOtp = async (email: string): Promise<OtpResponse> => {
    try {
        const response: AxiosResponse<OtpResponse> = await axios.post(
            `${API_getBaseUrl}/resend-otp`,
            { email }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to resend OTP";
    }
};

// Verify OTP
export const verifyOtp = async (email: string, otp: string): Promise<OtpResponse> => {
    try {
        const response: AxiosResponse<OtpResponse> = await axios.post(
            `${API_getBaseUrl}/verify-otp`,
            { email, otp },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Invalid OTP";
    }
};

// Login User
export const loginUser = async (userData: UserData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(
            `${API_getBaseUrl}/login`,
            userData,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Logout User
export const logoutUser = async (): Promise<void> => {
    try {
        await axios.post(`${API_getBaseUrl}/logout`);
    } catch (error: any) {
        console.error("Logout failed", error);
    }
};

// Fetch Dashboard Data (Protected Route)
export const fetchDashboard = async (): Promise<DashboardData> => {
    try {
        const response: AxiosResponse<DashboardData> = await axios.get(
            `${API_getBaseUrl}/dashboard`,
            {
                withCredentials: true, // Include session cookies
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to fetch dashboard data";
    }
};

export const loginAdmin = async (userData: UserData): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:3000/api/admin/login", // Dedicated admin login route
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Admin login failed";
    }
  };

  export const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/update-password",
        { currentPassword, newPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to update password";
    }
  };