import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove section number 05 from Unpopular Opinions
content = re.sub(r'<span class="section-num">05</span>\s*<h2 class="section-title">Unpopular Opinions</h2>', '<h2 class="section-title">Unpopular Opinions</h2>', content)

# Replace all backtick-n with space
content = content.replace('\u0060n', ' ')

# Replace em-dash entity
content = content.replace('&ndash;', '-')
content = content.replace('\u2013', '-')
content = content.replace('\u2014', '-')

# Fix encoding issue
content = content.replace('\u00e2\u0080\u0099', '-')
content = content.replace('\xe2\x80\x99', '-')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')