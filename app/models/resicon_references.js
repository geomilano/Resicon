exports.definition = {
	config: {
		columns: { 
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "rtype": "TEXT",
		    "field1": "TEXT",
		    "field2": "TEXT",
		    "field3": "TEXT",
		    "field4": "TEXT",
		    
		},
		adapter: {
			type: "sql",
			collection_name: "resicon_references",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			addColumn : function( newFieldName, colSpec) {
				var collection = this;
				var db = Ti.Database.open(collection.config.adapter.db_name);
				if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var fieldExists = false;
				resultSet = db.execute('PRAGMA TABLE_INFO(' + collection.config.adapter.collection_name + ')');
				while (resultSet.isValidRow()) {
					if(resultSet.field(1)==newFieldName) {
						fieldExists = true;
					}
					resultSet.next();
				}  
			 	if(!fieldExists) { 
					db.execute('ALTER TABLE ' + collection.config.adapter.collection_name + ' ADD COLUMN '+newFieldName + ' ' + colSpec);
				}
				db.close();
			},
			getReference : function(type,fieldName, code){
				var collection = this; 
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE rtype='"+type+"' AND "+fieldName+"='"+code+"'  ";
      
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var arr; 
                var res = db.execute(sql);
                if (res.isValidRow()){
					arr = {
					    field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						field3:  res.fieldByName('field3'),
						field4: res.fieldByName('field4')
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			}, 
			getReferenceByType: function(type){ 
                var collection = this; 
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE rtype='"+type+"'  ";
           
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
               	var arr = []; 
                var count = 0;
                while (res.isValidRow()){
					arr[count] = {  
						rtype: res.fieldByName('rtype'),
						field1: res.fieldByName('field1'), 
					    field2: res.fieldByName('field2'),
					    field3: res.fieldByName('field3'),
					    field4: res.fieldByName('field4') 
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			 
			addData : function(rtype,field1, field2,field3, field4) { 
	            var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
	           // db.execute("BEGIN");
				sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(rtype, field1, field2,field3, field4) VALUES ('"+rtype+"', '"+field1+"', '"+field2+"', '"+field3+"', '"+field4+"')";
		 		db.execute(sql_query);
               // db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
	            
            },
            resetReference : function(){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
		});

		return Collection;
	}
};
