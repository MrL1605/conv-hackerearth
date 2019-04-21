package com.redit.service;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.support.ConnectionSource;
import com.redit.db.Employee;
import com.redit.db.EmployeeExpenses;
import com.redit.db.Expense;
import com.redit.utils.ValidationException;

import javax.ws.rs.*;
import java.io.IOException;
import java.sql.SQLException;

import static com.redit.ConvApp.getConnection;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */

@Path("expense")
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class ExpenseService {

    @GET
    @Path("${id}")
    public Expense getExpense(@PathParam("id") Integer id) throws SQLException, IOException {
        try (ConnectionSource con = getConnection()) {
            Expense exp = Expense.getDao(con).queryForId(id);
            if (exp == null)
                throw new ValidationException("No such expense");
            return exp;
        }
    }

    @POST
    @Path("/")
    public Integer getExpense(Expense expense) throws SQLException, IOException {

        try (ConnectionSource con = getConnection()) {

            if (expense.title.isEmpty())
                throw new ValidationException("Title of expense cannot be empty");

            Employee emp = Employee.getDao(con).queryForId(expense.manager.id);
            if (!emp.isManager)
                throw new ValidationException("Only manager can approve expenses");

            expense.isApproved = false;
            return Expense.getDao(con).create(expense);
        }
    }

    @PUT
    @Path("/approve/${id}")
    public Integer approveExpense(Integer id) throws SQLException, IOException {

        try (ConnectionSource con = getConnection()) {

            Dao<Expense, Integer> dao = Expense.getDao(con);
            Expense expense = dao.queryForId(id);

            // TODO: get current user from session, and check if manager is same
            if (expense == null)
                throw new ValidationException("No such expense");

            for (EmployeeExpenses ee : EmployeeExpenses.getDao(con).queryForEq("expense", expense)) {
                ee.employee.addApprovedExpense(expense.amount);
                Employee.getDao(con).update(ee.employee);
            }

            expense.isApproved = true;
            return dao.update(expense);
        }
    }

}
