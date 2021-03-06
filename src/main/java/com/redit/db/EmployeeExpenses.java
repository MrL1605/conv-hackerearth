package com.redit.db;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.DatabaseTable;

import java.sql.SQLException;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
@DatabaseTable(tableName = "employee_expenses")
public class EmployeeExpenses {

    @DatabaseField(generatedId = true)
    public int id;

    // This is a foreign object which just stores the id from the User object in this table.
    @DatabaseField(foreign = true, columnName = "employee")
    public Employee employee;

    // This is a foreign object which just stores the id from the Post object in this table.
    @DatabaseField(foreign = true, columnName = "expense")
    public Expense expense;

    public static Dao<EmployeeExpenses, Integer> getDao(ConnectionSource con) throws SQLException {
        return DaoManager.createDao(con, EmployeeExpenses.class);
    }

}
