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
@DatabaseTable(tableName = "expense")
public class Expense {

    @DatabaseField(generatedId = true)
    public int id;

    @DatabaseField(columnName = "name", canBeNull = false)
    public String title;

    @DatabaseField(columnName = "is_approved", canBeNull = false)
    public Boolean isApproved;

    @DatabaseField(columnName = "amount", canBeNull = false)
    public Long amount = 0L;

    @DatabaseField(foreign = true, columnName = "manager")
    public Employee manager;

    public static Dao<Expense, Integer> getDao(ConnectionSource con) throws SQLException {
        return DaoManager.createDao(con, Expense.class);
    }

}
