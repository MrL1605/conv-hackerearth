package com.redit.service;

import com.j256.ormlite.support.ConnectionSource;
import com.redit.db.Employee;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.io.IOException;
import java.sql.SQLException;

import static com.redit.ConvApp.getConnection;
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
    public Employee test() throws SQLException, IOException {

        Employee emp = new Employee("Name" + System.currentTimeMillis(), false);
        try (ConnectionSource con = getConnection()) {
            System.out.println(Employee.getDao(con).create(emp));
            System.out.println(Employee.getDao(con).countOf());
        }
        return emp;
    }
}
