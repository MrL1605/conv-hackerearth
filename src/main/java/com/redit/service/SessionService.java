package com.redit.service;

import com.redit.utils.UserPrincipal;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 01 May 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
@Path("session")
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class SessionService {

    @Path("isLoggedIn")
    public String loginCheck(@Context UserPrincipal principal) {
        return "OK";
    }

}
