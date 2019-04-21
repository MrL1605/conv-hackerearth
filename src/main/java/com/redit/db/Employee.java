package com.redit.db;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.DatabaseTable;

import java.sql.SQLException;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */

@DatabaseTable(tableName = "employee")
public class Employee {

    @DatabaseField(generatedId = true)
    public int id;

    @DatabaseField(columnName = "name", canBeNull = false)
    public String name;

    @DatabaseField(columnName = "is_manager", canBeNull = false)
    public Boolean isManager;

    @DatabaseField(columnName = "reimbursement", canBeNull = false)
    public Long reimbursement = 0L;

    public Employee() {
    }

    public Employee(String name, Boolean isManager) {
        this.name = name;
        this.isManager = isManager;
    }

    public static Dao<Employee, Integer> getDao(ConnectionSource con) throws SQLException {
        return DaoManager.createDao(con, Employee.class);
    }

    public void addApprovedExpense(int amount) {
        reimbursement += amount;
    }

}
