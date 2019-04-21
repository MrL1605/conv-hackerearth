package com.redit.service;

import com.j256.ormlite.support.ConnectionSource;
import com.redit.db.Employee;
import com.redit.db.EmployeeExpenses;
import com.redit.db.Expense;
import com.redit.utils.ValidationException;

import javax.ws.rs.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static com.redit.ConvApp.getConnection;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */

@Path("/employee")
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class EmployeeService {

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

    @GET
    @Path("${id}")
    public Employee getExpense(@PathParam("id") Integer id) throws SQLException, IOException {
        try (ConnectionSource con = getConnection()) {
            Employee emp = Employee.getDao(con).queryForId(id);
            if (emp == null)
                throw new ValidationException("No such employee");
            return emp;
        }
    }

    @GET
    @Path("expenses/${id}")
    public List<Expense> getMyExpenses(@PathParam("id") Integer id) throws SQLException, IOException {

        // TODO: remove id and replace with session
        try (ConnectionSource con = getConnection()) {
            Employee emp = Employee.getDao(con).queryForId(id);
            List<Expense> expenseList = new ArrayList<>();
            for (EmployeeExpenses ee : EmployeeExpenses.getDao(con).queryForEq("employee", emp)) {
                expenseList.add(ee.expense);
            }
            return expenseList;
        }
    }


}
