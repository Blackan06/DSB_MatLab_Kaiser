from flask import render_template, request, redirect, url_for, send_from_directory
import os
from app import app




@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Add this line at the top of your `__init__.py` to configure upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'
