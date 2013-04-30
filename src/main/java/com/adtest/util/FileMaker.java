package com.adtest.util;

import java.io.File;
import java.io.PrintWriter;

public class FileMaker {

private boolean success = false;

	public boolean makeFile(String path) {
		try {
			File f = new File(path + "\\TestFile.db"); // CREATE A FILE
			if (!f.exists())
				f.createNewFile();
			PrintWriter writer = new PrintWriter(f);
			writer.println("This is a test statement on a test file");
			writer.close();
			success = true;
		} catch (Exception exc) {
			exc.printStackTrace();
			return success;
		}
		return success;
	}
}