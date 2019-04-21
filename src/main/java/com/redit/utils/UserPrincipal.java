package com.redit.utils;

import java.security.Principal;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
public class UserPrincipal implements Principal {

    public String user;
    public String sessionKey;

    public UserPrincipal(String sessionKey, String name) {
        this.sessionKey = sessionKey;
        this.user = name;
    }

    @Override
    public String getName() {
        return this.user;
    }
}
