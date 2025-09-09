"use client"

import Link from "next/link"
import css from "./AuthNavigation.module.css"
import { useAuthStore } from "@/lib/store/authStore"
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";


const AuthNavigation = () => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);


    const handleLogout = async () => {
        await logoutUser();
        clearIsAuthenticated();
        router.push("/sign-in");
    };


    return (
        <>
            {!isAuthenticated ? (
                <>
                    <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                        Login
                    </Link>

                    <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                        Sign up
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/profile" prefetch={false} className={css.navigationLink}>
                        Profile
                    </Link>

                    <li className={css.navigationItem}>
                            <p className={css.userEmail}>{user?.email}</p>
                        <button className={css.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </>
            )}
        </>    
    )

};

export default AuthNavigation;
