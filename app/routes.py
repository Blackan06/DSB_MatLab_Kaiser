from flask import render_template, request, redirect, url_for, send_from_directory
import os
from app import app


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        audio_data = request.files['audio_data']
        if audio_data:
            audio_data.save(os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_audio.ogg'))
            return redirect(url_for('index'))

    return render_template('index.html')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Add this line at the top of your `__init__.py` to configure upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'
