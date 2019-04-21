package com.redit.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */

@Path("/service")
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class ConvService {

    @GET
    @Path("/root")
    public String test() {
        System.out.println("here");
        return "Hello";
    }
}
