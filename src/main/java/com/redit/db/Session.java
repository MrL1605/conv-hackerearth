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
@DatabaseTable(tableName = "session")
public class Session {

    @DatabaseField(columnName = "user", canBeNull = false, unique = true)
    public int user;

    @DatabaseField(id = true, columnName = "session_id", canBeNull = false, unique = true)
    public String sessionId;

    public Session() {
    }

    public Session(int user, String sessionId) {
        this.user = user;
        this.sessionId = sessionId;
    }

    public static Dao<Session, String> getDao(ConnectionSource con) throws SQLException {
        return DaoManager.createDao(con, Session.class);
    }

}
