package com.redit.utils;

import com.redit.db.Session;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
public class UserPrincipal implements Principal {

    public String userName;
    public int userId;
    public String sessionKey;

    public UserPrincipal(String userName, int userId, String sessionKey) {
        this.userName = userName;
        this.userId = userId;
        this.sessionKey = sessionKey;
    }

    public UserPrincipal(Session session) {
        this.userId = session.user;
        this.sessionKey = session.sessionId.split("@")[0];
        List<String> name = new ArrayList<>(Arrays.asList(session.sessionId.split("@")));
        name.remove(0);
        this.userName = String.join("@", name);
    }

    @Override
    public String getName() {
        System.out.println("accessing name [" + this.userName + "]");
        return this.userName;
    }
}
