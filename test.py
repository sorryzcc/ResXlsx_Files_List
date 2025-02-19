import os
import pandas as pd
import re

def natural_sort_key(s):
    """用于自然排序的键函数"""
    return [int(text) if text.isdigit() else text.lower() for text in re.split('([0-9]+)', s)]

def list_files_in_directory(directory_path):
    """列出指定目录下的所有文件名（不包括目录），并按自然顺序排序"""
    files = [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]
    return sorted(files, key=natural_sort_key)

def write_to_excel(file_list, output_file):
    """将文件列表写入到Excel文件中"""
    df = pd.DataFrame(file_list, columns=["File Name"])
    df.to_excel(output_file, index=False)

# 指定要读取的目录路径
directory_path = r'D:\PM_Mainland_Trunk_20230321_r552586\PMGameClient\Tables\ResXlsx'

# 获取该目录下所有文件的文件名，并进行自然排序
files = list_files_in_directory(directory_path)

# 指定输出的Excel文件路径
output_file = 'output_natural_sorted.xlsx'  # 改为新的文件名以避免覆盖原文件

# 将文件名写入Excel文件
write_to_excel(files, output_file)

print(f"成功生成包含已自然排序文件名的Excel文件: {output_file}")