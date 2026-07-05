import csv
import json
import os
import re

def parse_phylum(organism):
    # Mapping common genera/organisms to their bacterial phyla
    phyla_map = {
        'Piscinibacter': 'Pseudomonadota',
        'Thermobifida': 'Actinomycetota',
        'Moraxella': 'Pseudomonadota',
        'Escherichia': 'Pseudomonadota',
        'Mycobacterium': 'Actinomycetota',
        'Malassezia': 'Basidiomycota',
        'Saccharolobus': 'Crenarchaeota',
        'Thermothelomyces': 'Ascomycota',
        'Arabidopsis': 'Streptophyta',
        'Aspergillus': 'Ascomycota',
        'Talaromyces': 'Ascomycota',
        'Sphingobium': 'Pseudomonadota',
        'Hypocrea': 'Ascomycota',
        'Streptomyces': 'Actinomycetota',
        'Bacillus': 'Bacillota',
        'Pseudomonas': 'Pseudomonadota',
        'Fusarium': 'Ascomycota',
        'Humicola': 'Ascomycota',
        'Coprinopsis': 'Basidiomycota',
        'Rhizopus': 'Mucoromycota'
    }
    
    for genus, phylum in phyla_map.items():
        if genus.lower() in organism.lower():
            return phylum
    return 'Other/Unclassified'

def process_dataset():
    root_dir = "C:\\Users\\Admin\\Downloads\\synzyme genesis"
    csv_path = os.path.join(root_dir, "frontend", "public", "cleaned_synzyme_dataset.csv")
    
    if not os.path.exists(csv_path):
        print("cleaned_synzyme_dataset.csv not found in public folder!")
        return

    lengths = []
    phyla_counts = {}

    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Length
            lengths.append(int(row['length']))
            
            # Extract Organism Name from Description (e.g. OS=Piscinibacter sakaiensis)
            desc = row['description']
            match = re.search(r'OS=([^=]+?)(?=\s[A-Z]{2}=|$)', desc)
            if match:
                organism = match.group(1).strip()
                phylum = parse_phylum(organism)
                phyla_counts[phylum] = phyla_counts.get(phylum, 0) + 1
            else:
                phyla_counts['Other/Unclassified'] = phyla_counts.get('Other/Unclassified', 0) + 1

    # Format taxonomy data for Recharts
    taxonomy_data = [
        {"phylum": phylum, "count": count} 
        for phylum, count in phyla_counts.items()
    ]
    
    # Sort taxonomy data by count
    taxonomy_data.sort(key=lambda x: x['count'], reverse=True)

    # Bin the length distribution
    # Let's create bins: <250, 250-275, 275-300, 300-325, 325-350, >350
    len_bins = {
        "< 250": 0,
        "250-275": 0,
        "275-300": 0,
        "300-325": 0,
        "325-350": 0,
        "> 350": 0
    }
    for length in lengths:
        if length < 250:
            len_bins["< 250"] += 1
        elif length <= 275:
            len_bins["250-275"] += 1
        elif length <= 300:
            len_bins["275-300"] += 1
        elif length <= 325:
            len_bins["300-325"] += 1
        elif length <= 350:
            len_bins["325-350"] += 1
        else:
            len_bins["> 350"] += 1

    length_data = [
        {"range": range_name, "count": count}
        for range_name, count in len_bins.items()
    ]

    analytics = {
        "totalSequences": len(lengths),
        "avgLength": round(sum(lengths) / len(lengths), 1),
        "minLength": min(lengths),
        "maxLength": max(lengths),
        "taxonomy": taxonomy_data,
        "lengthDistribution": length_data
    }

    out_dir = os.path.join(root_dir, "frontend", "src", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "dataset_analytics.json")
    
    with open(out_path, mode='w', encoding='utf-8') as f:
        json.dump(analytics, f, indent=2)
        
    print(f"Successfully processed dataset analytics and saved to {out_path}")

if __name__ == "__main__":
    process_dataset()
