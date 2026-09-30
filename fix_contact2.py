with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace "reach me -”" with "reach me."
content = content.replace('reach me -\u201d', 'reach me.')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')