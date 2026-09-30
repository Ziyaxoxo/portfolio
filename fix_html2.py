with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the section number span for Unpopular Opinions
content = content.replace('<span class="section  um">05</span>', '')

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