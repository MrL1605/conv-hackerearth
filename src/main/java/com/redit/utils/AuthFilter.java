package com.redit.utils;

import com.j256.ormlite.support.ConnectionSource;
import com.redit.db.Session;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.regex.Pattern;

import static com.redit.ConvApp.getConnection;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */


public class AuthFilter implements Filter {

    private static String getSessionCookie(HttpServletRequest request) {
        Cookie[] ck = request.getCookies();
        String sessionVal = "-1";
        for (int i = 0; ck != null && i < ck.length; i++) {
            if (ck[i].getName().equalsIgnoreCase("session_id")) {
                sessionVal = ck[i].getValue();
                break;
            }
        }
        return sessionVal;
    }

    private static void send401(HttpServletResponse res) throws IOException {
        res.setStatus(401);
        PrintWriter pw = res.getWriter();
        pw.write("Session not valid");
        pw.flush();
        pw.close();
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse httpRes = (HttpServletResponse) servletResponse;
        String path = request.getRequestURI().substring(request.getContextPath().length()).replaceAll("[/]+$", "");

        System.out.println(path);

        Pattern ignoredPattern = Pattern.compile("^/api/login.*");
        boolean toIgnore = ignoredPattern.matcher(path).matches();
        if (toIgnore) {
            System.out.println("Ignoring filter for path[" + path + "]");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        try (ConnectionSource con = getConnection()) {

            if (getSessionCookie(request).equals("-1") || getSessionCookie(request).isEmpty()) {
                send401(httpRes);
                return;
            }

            Session session = Session.getDao(con).queryForId(getSessionCookie(request));
            if (session == null) {
                send401(httpRes);
                return;
            }

            UserRequestWrapper wrapper = new UserRequestWrapper(request, new UserPrincipal(session));
            filterChain.doFilter(wrapper, servletResponse);

        } catch (SQLException e) {
            e.printStackTrace();
            send401(httpRes);
            filterChain.doFilter(servletRequest, httpRes);
        }
    }

    @Override
    public void destroy() {
    }
}
