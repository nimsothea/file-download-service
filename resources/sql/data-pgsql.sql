-- Insert data scripts for for File download service (Tiedostopalvelu)
-- Compatible and tested with PostgreSQL 9.x

-- Insert base data
INSERT INTO token_type(id,type) VALUES(1,'token');
INSERT INTO token_type(id,type) VALUES(2,'apikey');

-- Internal built-in accounts
INSERT INTO account(username,is_internal) VALUES('_system_',true);
INSERT INTO account(username,is_internal) VALUES('_opendata_',true);

-- Grant all JCR privileges to internal system account
INSERT INTO jcr_permission(account_id,jcr_path,privileges) VALUES(
 (SELECT id FROM account WHERE username = '_system_'),'/',
 '{"read","add_node","set_property","remove","remove_child_nodes","index_workspace","backup","restore"}');
 
CREATE INDEX access_token_token_token_type_idx ON access_token(token,token_type);
CREATE INDEX jcr_permission_account_id_idx ON jcr_permission(account_id);